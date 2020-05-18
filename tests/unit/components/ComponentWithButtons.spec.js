import Vuex from "vuex";
import chai from "chai";
import { fake } from "sinon";
import sinonChai from "sinon-chai";
import { createLocalVue, mount } from "@vue/test-utils";
import ComponentWithButtons from "@/components/ComponentWithButtons.vue";

const localVue = createLocalVue();
const mutations = { testMutation: fake() };

localVue.use(Vuex);
chai.use(sinonChai);

const store = new Vuex.Store({ mutations });

describe("ComponentWithButtons", () => {
  it("commits a mutation when a button is clicked", async () => {
    const wrapper = mount(ComponentWithButtons, { store, localVue });

    wrapper.find(".commit").trigger("click");
    await wrapper.vm.$nextTick();

    chai
      .expect(mutations.testMutation)
      .to.have.been.calledWith({}, { msg: "Test Commit" });
  });

  it("dispatch a namespaced action when button is clicked", async () => {
    store.dispatch = fake();

    const wrapper = mount(ComponentWithButtons, { store, localVue });

    wrapper.find(".namespaced-dispatch").trigger("click");
    await wrapper.vm.$nextTick();

    chai
      .expect(store.dispatch)
      .to.have.been.calledWith("namespaced/very/deeply/testAction", {
        msg: "Test Namespaced Dispatch"
      });
  });
});
