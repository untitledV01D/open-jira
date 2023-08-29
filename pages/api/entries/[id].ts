import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
  | { message: string }
  | IEntry
  | null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'invalid id' });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: 'This method does not exists' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'There is not entry with that id' });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body as Omit<IEntry, '_id'>;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, {
      description,
      status,
    }, { runValidators: true, new: true });
    db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (e) {
    db.disconnect();
    return res.status(400).json({ message: 'Something was wrong' });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as { id: string };

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(400).json({ message: `Entry with ${ id } does not exists` });
  }

  return res.status(200).json(entry!);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as { id: string };

  await db.connect();
  await Entry.findByIdAndDelete(id);
  await db.disconnect();

  res.status(204).send(null);
};
