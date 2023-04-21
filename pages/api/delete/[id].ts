import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const taskId = req.query.id;
    if (req.method === 'DELETE') {
      const task = await prisma.task.delete({
        where: { id: taskId },
      });
      res.json(task);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    }
  }