import Vuex from "vuex";
import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import ComponentWithVuex from "@/components/ComponentWithVuex.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({ state: { username: "alice" } });

describe("ComponentWithVuex", () => {
  it("renders a username using a real Vuex store", () => {
    const wrapper = mount(ComponentWithVuex, { store, localVue });

    expect(wrapper.find(".username").text()).to.equal("alice");
  });

  it("renders a username using a mock store", () => {
    const wrapper = mount(ComponentWithVuex, {
      mocks: { $store: { state: { username: "alice" } } }
    });

    expect(wrapper.find(".username").text()).to.equal("alice");
  });
});
