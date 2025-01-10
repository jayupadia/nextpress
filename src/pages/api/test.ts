import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/backend/config/database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase()
      res.status(200).json({ message: 'Backend is working and connected to the database!' })
    } catch (error) {
      console.error('Database connection error:', error)
      res.status(500).json({ error: 'Failed to connect to the database' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

