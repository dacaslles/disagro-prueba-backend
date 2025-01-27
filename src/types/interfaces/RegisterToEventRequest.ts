export interface RegisterToEventRequest {
    eventId: number,
    names: string;
    lastnames: string;
    email: string;
    date: string;
    itemList: number[];
    promotionList: number[];
}