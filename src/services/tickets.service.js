import { ticketRepository } from "../repositories/index.js";
import TicketDTO from "../daos/dtos/ticket.dto.js";

export default class TicketService {
  constructor() {}

///////////////////////////////////////////////////////////

 async getTicket() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(" tickets.service.js  en getTicket")
    const tickets = await ticketRepository.getTickets();
 
    return tickets;
  }

////////////////////////////////////////////////////////////////////////
async getTicketsById(tId) {
    const ticket = await ticketRepository.getTicketsById(tId);
    return ticket;
  }
////////////////////////////////////////////////////////////////////////

async createTicket(ticket) {
  console.log("estaoy ticket.service en el create xxx")

    const result = await ticketRepository.createTicket(ticket);
    return result;
  }
////////////////////////////////////////////////////////////////////////

async updateTicket(tId,ticketnuevo) {
    const createdProduct =  await ticketRepository.updateTicket(pId,ticketnuevo);
    return createdProduct;
  }
////////////////////////////////////////////////////////////////////////

async deleteTicket(tId) {
    const result = await ticketRepository.deleteTicket(tId);
    return result;
  }



/////////////////////////////////////////////////////////////////////////////////////
}