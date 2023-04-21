import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const taskId = req.query.id;
  const {title, description, dueDate, isInProgress, isCompleted } = req.body
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { 
        title: title,
        description: description,
        dueDate: dueDate,
        isInProgress: isInProgress,
        isCompleted: isCompleted,
        isNew: false
        },
    });
  res.json(task);
}