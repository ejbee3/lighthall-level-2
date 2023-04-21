import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const {title, description, dueDate } = req.body

    const result = await prisma.task.create({
        data: {
            title: title,
            description: description,
            isNew: true,
            dueDate: dueDate,
        }
    })
    res.json(result)
}