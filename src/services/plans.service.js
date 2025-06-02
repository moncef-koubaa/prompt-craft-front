import apiClientAuth from "./API/authenticated";

export default class PlansService {
    static async getPlans() {
        try{
            const response = await apiClientAuth.get("/plan");
            console.log("Response from getPlans:", response);
        
            return response.data;
        }
        catch (error) {
            console.error("Error fetching plans:", error);
            throw error;
        }
    }
    static async goToCheckout(planId) {
        try {
            const response = await apiClientAuth.post(`/payment/plan/${planId}`);
            console.log("Response from goToCheckout:", response);
            return response.data;
        } catch (error) {
            console.error("Error during checkout:", error);
            throw error;
        }
    }
}