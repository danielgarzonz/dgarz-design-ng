import { createApp, defineComponent, h, ref } from 'vue';
import { DgarzButton } from 'dgarz-design-vue';
import 'dgarz-design/tokens';

createApp(defineComponent({
  setup() {
    const disabled = ref(false);
    const loading = ref(false);
    const count = ref(0);
    return () => h('div', [
      h(DgarzButton, { variant: 'secondary', disabled: disabled.value, loading: loading.value, 'onDgarz-click': () => count.value++ }, () => 'Guardar'),
      h('button', { onClick: () => disabled.value = !disabled.value }, 'Alternar deshabilitado'),
      h('button', { onClick: () => loading.value = !loading.value }, 'Alternar carga'),
      h('output', { id: 'count' }, count.value),
    ]);
  },
})).mount('#app');
