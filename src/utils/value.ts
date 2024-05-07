import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';

export const value = (ctx: RenderFieldExtensionCtx, targetName: string | undefined, localised: boolean) => {
	if (targetName) {
		if (localised) {
			return (ctx.formValues[targetName] as Record<string, string>)[ctx.locale];
		} else {
			return ctx.formValues[targetName] as string;
		}
	}
	return undefined;
};
