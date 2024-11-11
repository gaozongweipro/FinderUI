import { openBlock as o, createBlock as d, unref as c, mergeProps as s, withCtx as u, renderSlot as r } from "vue";
import { ElButton as f } from "element-plus";
const a = {
  __name: "button",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (e) => ["default", "primary", "success", "warning", "danger", "info"].includes(e)
    },
    size: {
      type: String,
      default: "default",
      validator: (e) => ["large", "default", "small"].includes(e)
    },
    plain: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    circle: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: String,
      default: ""
    }
  },
  emits: ["click"],
  setup(e, { emit: l }) {
    const n = l, i = (t) => {
      n("click", t);
    };
    return (t, p) => (o(), d(c(f), s({
      type: e.type,
      size: e.size,
      plain: e.plain,
      round: e.round,
      circle: e.circle,
      disabled: e.disabled,
      loading: e.loading,
      icon: e.icon
    }, t.$attrs, { onClick: i }), {
      default: u(() => [
        r(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "plain", "round", "circle", "disabled", "loading", "icon"]));
  }
};
a.install = (e) => {
  e.component("MyButton", a);
};
const y = [a], m = (e) => {
  y.forEach((l) => {
    e.use(l);
  });
}, k = { install: m };
export {
  a as MyButton,
  k as default,
  m as install
};
