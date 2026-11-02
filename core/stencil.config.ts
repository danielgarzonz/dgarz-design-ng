import type { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'dgarz',
  tsconfig: 'tsconfig.components.json',
  srcDir: 'src/components',
  sourceMap: false,
  buildDist: true,
  outputTargets: [{
    type: 'dist-custom-elements',
    dir: 'dist/components',
    empty: false,
    customElementsExportBehavior: 'single-export-module',
    externalRuntime: false,
    generateTypeDeclarations: true,
  },
  {
    type: 'dist-hydrate-script',
    dir: 'dist/hydrate',
    empty: true,
  },
  { type: 'docs-json', file: 'dist/component-docs.json' },
  reactOutputTarget({
    outDir: '../packages/react/src/generated',
    stencilPackageName: 'dgarz-design',
    customElementsDir: 'components',
  }),
  vueOutputTarget({
    componentCorePackage: 'dgarz-design',
    proxiesFile: '../packages/vue/src/generated/components.ts',
    customElementsDir: 'components',
    includeImportCustomElements: true,
  }),
  angularOutputTarget({
    componentCorePackage: 'dgarz-design',
    directivesProxyFile: '../packages/angular/src/generated/components.ts',
    customElementsDir: 'components',
    outputType: 'standalone',
    inlineProperties: true,
  })],
};
