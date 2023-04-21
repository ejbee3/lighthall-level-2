import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const {title, description, dueDate, userName } = req.body

    const result = await prisma.task.create({
        data: {
            title: title,
            description: description,
            isNew: true,
            created: true,
            dueDate: dueDate,
            userName: userName
        }
    })
    res.json(result)
}