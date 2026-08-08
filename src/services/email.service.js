const { TicketRepository } = require("../repositories");
const  {mailer} = require("../config");
const AppError = require("../utils/errors/app.error");
const { StatusCodes } = require("http-status-codes");

const ticketRepository = new TicketRepository();

async function sendEMail(mailFrom, mailTo, subject, text) {
  try {
    const response = await mailer.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new AppError("Not able to send the email", StatusCodes.BAD_REQUEST);
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.error(error);
    throw new AppError("Not able to create the ticket.", StatusCodes.CREATED);
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepository.getPendingTickets();
    return response;
  } catch (error) {
    console.error(error);
    throw new AppError(
      "Not able to fetch the pending emails.",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = { sendEMail, createTicket, getPendingEmails };
