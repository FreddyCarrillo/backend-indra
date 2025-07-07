import { Router } from 'express';
import { dependencies } from '../../../config/dependencies';
import { AwsMessagingService } from '../../messaging/AwsMessagingService';

const router = Router();
const messaging = new AwsMessagingService();

router.post("/appointments", async (req, res) => {
  try {
    let body = req.body;
    if (Buffer.isBuffer(body)) {
      body = JSON.parse(body.toString());
    }

    const appointment = await dependencies.createAppointment.execute(body);
    const topicArn = body.countryISO === "PE"
      ? process.env.SNS_TOPIC_PE_ARN
      : process.env.SNS_TOPIC_CL_ARN;
    await messaging.publishToSns(topicArn!, appointment);

    res.status(201).json({ message: "Agendamiento en proceso", appointment });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/appointments/:insuredId", async (req, res) => {
  try {
    const appointments = await dependencies.listAppointments.execute(req.params.insuredId);
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export { router as appointmentRoutes };
