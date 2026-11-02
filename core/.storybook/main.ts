import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.tsx'],
  framework: '@storybook/html-vite',
  viteFinal: async (config) => {
    config.build = { ...config.build, lib: undefined };
    return config;
  },
};
export default config;
