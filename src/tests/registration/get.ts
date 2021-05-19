// Import dependencies
import { getRoute } from "../test-utils";

// Declare and Export Authors Router Tests
export const getRegistration = function(): void {

  describe("GET /registration", function(): void {
    const pgContent: string[] = ["Email:", "Username:", "Password:", "Submit"];
    getRoute("/registration", "auth/register", pgContent);
  });
}


