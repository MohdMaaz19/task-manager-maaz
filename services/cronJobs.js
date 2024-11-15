// import cron from 'node-cron';
// import { sendEmail } from './emailService.js';
// import db from '../models/index.js';
// import dotenv from 'dotenv';

// dotenv.config();

// // Schedule job to check tasks due within the next hour
// cron.schedule('0 * * * *', async () => {
//   console.log('Checking for tasks due within the next hour...');

//   const now = new Date();
//   const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

//   try {
//     const tasks = await db.Task.findAll({
//       where: {
//         dueDate: {
//           [db.Sequelize.Op.between]: [now, oneHourFromNow],
//         },
//         status: 'pending',
//       },
//     });

//     if (tasks.length === 0) {
//       console.log('No tasks due within the next hour.');
//       return;
//     }

//     tasks.forEach(async (task) => {
//       const userEmail = task.userEmail;

//       // Send email reminder
//       await sendEmail(
//         userEmail,
//         `Task Reminder: ${task.title}`,
//         `Your task "${task.title}" is due within the next hour. Please complete it soon.`
//       );
//     });

//     console.log('Task reminders processed.');
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//   }
// });
