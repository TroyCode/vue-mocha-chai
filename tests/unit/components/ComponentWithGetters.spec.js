import Vuex from "vuex";
import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import ComponentWithGetters from "@/components/ComponentWithGetters.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: { firstName: "Alice", lastName: "Doe" },
  getters: { fullname: state => state.firstName + " " + state.lastName }
});

describe("ComponentWithGetters", () => {
  it("renders a username using a real Vuex getter", () => {
    const wrapper = mount(ComponentWithGetters, { store, localVue });

    expect(wrapper.find(".fullname").text()).to.equal("Alice Doe");
  });

  it("renders a username using computed mounting options(mocks)", () => {
    const wrapper = mount(ComponentWithGetters, {
      mocks: { $store: { getters: { fullname: "Alice Doe" } } }
    });

    expect(wrapper.find(".fullname").text()).to.equal("Alice Doe");
  });

  it("renders a username using computed mounting options(computed)", () => {
    const wrapper = mount(ComponentWithGetters, {
      computed: { fullname: () => "Alice Doe" }
    });

    expect(wrapper.find(".fullname").text()).to.equal("Alice Doe");
  });
});
