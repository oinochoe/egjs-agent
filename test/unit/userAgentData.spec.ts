import getAgent, { getAccurateAgent } from "../../src/agent";
import AGENT_DATA_LIST from "./userAgentDataConsts";

describe("test userAgentData", () => {
    AGENT_DATA_LIST.forEach(data => {
        describe(`test ${data.name}'s agent`, () => {
           const originalNavigator = window.navigator;

            beforeEach(() => {
                Object.defineProperty(window, "navigator", {
                    value: {
                        ...originalNavigator,
                        userAgentData: {
                            ...data.userAgentData,
                            getHighEntropyValues: () => Promise.resolve(data.osData),
                        },
                        platform: data.platform,
                    },
                    configurable: true,
                    writable: true,
                });
            });
            afterEach(() => {
                Object.defineProperty(window, "navigator", {
                    value: originalNavigator,
                    configurable: true,
                    writable: true,
                });
            });
            it ("test getAgent", () => {
                // Given, When
                const agent = getAgent();

                // Then
                // name
                expect(agent.os.name).toBe(data.result.os.name);
                expect(agent.browser.name).toBe(data.result.browser.name);

                // version
                expect(agent.os.version).toBe(data.result.os.version);
                expect(agent.browser.version).toBe(data.result.browser.version);

                // engine
                expect(agent.isMobile).toBe(data.result.isMobile);
                expect(agent.browser.chromium).toBe(data.result.browser.chromium);
                expect(agent.browser.webkit).toBe(data.result.browser.webkit);
            });
            it ("test getAccurateAgent", async () => {
                // Given, When
                const agent = await getAccurateAgent()!;

                // Then
                // name
                expect(agent.os.name).toBe(data.accurateResult.os.name);
                expect(agent.browser.name).toBe(data.result.browser.name);

                // version
                expect(agent.os.version).toBe(data.accurateResult.os.version);
                expect(agent.browser.version).toBe(data.accurateResult.browser.version);

                // engine
                expect(agent.isMobile).toBe(data.result.isMobile);
                expect(agent.browser.chromium).toBe(data.result.browser.chromium);
                expect(agent.browser.webkit).toBe(data.result.browser.webkit);
            });
        });
    });

});
