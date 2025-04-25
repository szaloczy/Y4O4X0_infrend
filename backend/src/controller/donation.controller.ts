import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Donation } from "../entity/Donation";

export class DonationController extends Controller {
    repository = AppDataSource.getRepository(Donation);

    getAll = async (req, res) => {
        try {
            const { locationId, clientId, fromDate, toDate } = req.query;

            const query = this.repository
                .createQueryBuilder("donation")
                .leftJoinAndSelect("donation.client", "client")
                .leftJoinAndSelect("donation.location", "location")
                .where("donation.eligible = :eligible", { eligible: true });
    
            if (locationId) {
                query.andWhere("donation.locationId = :locationId", { locationId });
            }
    
            if (clientId) {
                query.andWhere("donation.clientId = :clientId", { clientId });
            }
    
            if (fromDate) {
                query.andWhere("donation.date >= :fromDate", { fromDate });
            }
    
            if (toDate) {
                query.andWhere("donation.date <= :toDate", { toDate });
            }
    
            const donations = await query.getMany();
    
            const donationDTOs = donations.map(donation => ({
                id: donation.id,
                date: new Date(donation.date).toISOString().split('T')[0],
                eligible: donation.eligible,
                reason: donation.reason,
                doctor: donation.doctor,
                controlled: donation.controlled,
                patient_fullname: donation.patient_fullname,
                patient_taj: donation.patient_taj,
                client: {
                    id: donation.client.id,
                    fullname: donation.client.fullname,
                    gender: donation.client.gender,
                    birthplace: donation.client.birthplace,
                    date_of_birth: new Date(donation.client.date_of_birth).toISOString().split('T')[0],
                    citizenship: donation.client.citizenship,
                    address: donation.client.address,
                    taj_number: donation.client.taj_number,
                },
                location: {
                    id: donation.location.id,
                    code: donation.location.code,
                    name: donation.location.name,
                    address: donation.location.address,
                    active: donation.location.active
                }
            }));
    
            res.json(donationDTOs);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}