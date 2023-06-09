# Level 2 challenge

## Get Organized with a Task Tracker App

For this challenge, you are going to build a task tracker app. Your minimum requirements are:

1. Create a task with a title, description, status (completed, in progress, etc.), and due date

2. Edit and delete Tasks

3. View all tasks, and sort by title, status, and due date

4. Users can log in by entering their name and will only see their tasks. That means, I should be able to enter “Maya”, add tasks for Maya and only see Maya’s tasks when I enter that name, whenever I visit the Task Tracker App

As a user, I should be able to access my tasks from any device – that means, the data needs to be stored server-side.

Finally, please make the website look nice. While this is the least important part of our grading criteria, it’s something that recruiters will look at when they review your portfolios. So just make sure it looks presentable. The web app doesn’t need to be responsive or mobile friendly.

---

clone the repo, check out `package.json` for dependencies!

---

```
error: Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
  -->  schema.prisma:7
   |
 6 |   provider = "postgresql"
 7 |   url      = env("DATABASE_URL")
   |
```
