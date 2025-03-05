import { TribeService } from "../service/TribeService";
import { Tribe } from "../model/tribe";


describe("TribeService Tests", () => {

    test("If a tribe is created, it should be returned to list", async () => {
        const tribeService = new TribeService();
        const title = "Test Tribe";
        const description = "This is a test tribe";

        await tribeService.createTribe(title, description);
        const tribes = await tribeService.getTribes();
        expect(tribes.some(tribe => tribe.title === title && tribe.description === description)).toBeTruthy();
    });
});
