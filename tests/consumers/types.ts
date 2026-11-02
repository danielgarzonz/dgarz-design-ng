import type { ComponentProps } from 'react';
import { DgarzButton as ReactButton } from 'dgarz-design-react';
import { DgarzButton as VueButton } from 'dgarz-design-vue';
import type { DgarzButton as AngularButton } from 'dgarz-design-angular';

const react: ComponentProps<typeof ReactButton> = { disabled: false, variant: 'secondary', onDgarzClick: event => { const detail: void = event.detail; } };
// @ts-expect-error Only supported variants are allowed.
react.variant = 'unsupported';
const vue: InstanceType<typeof VueButton>['$props'] = { disabled: false, variant: 'secondary' };
// @ts-expect-error Booleans must remain boolean.
vue.disabled = 'false';
declare const angular: AngularButton;
angular.variant = 'primary';
// @ts-expect-error Only supported variants are allowed.
angular.variant = 'unsupported';
