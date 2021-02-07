import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmenteService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentesRouter = Router();

appointmentesRouter.use(ensureAuthenticated);

appointmentesRouter.get('/', async (request, response) => {
  console.log('reqq: ', request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  console.log('get appointments: ', appointments)
  return response.json(appointments);
});

appointmentesRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    console.log('body: ', request.body);
    const parsedate = parseISO(date);

    const createAppointment = new CreateAppointmenteService();

    const appointment = await createAppointment.execute({
      date: parsedate,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentesRouter;
