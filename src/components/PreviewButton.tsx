import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { ButtonLink } from 'datocms-react-ui';
import { SlugButtonProps } from '../types';
import { useEffect, useMemo, useState } from 'react';

const regexp = /{([a-z-_]+)}/gi;

export const PreviewButton = ({
	ctx,
	button,
}: {
	ctx: RenderFieldExtensionCtx;
	button: SlugButtonProps;
}): JSX.Element => {
	const keys = useMemo(() => Array.from(button.value.matchAll(regexp)), [button.value]);

	const values = keys.map(([string, key]) => {
		if (!key) {
			return {
				find: string,
				replace: string,
			};
		}

		if (ctx.formValues[key]) {
			return {
				find: string,
				replace: ctx.formValues[key] as string,
			};
		} else if (ctx.plugin.attributes.parameters[key]) {
			return {
				find: string,
				replace: ctx.plugin.attributes.parameters[key] as string,
			};
		} else {
			return {
				find: string,
				replace: string,
			};
		}
	});

	const [url, setUrl] = useState(button.value);

	useEffect(() => {
		setUrl(
			values.reduce((acc, { find, replace }) => {
				return acc.replace(find, replace);
			}, button.value)
		);
	}, [values]);

	return (
		<ButtonLink buttonType={button.style || 'muted'} href={url} target='_blank'>
			{button.label}
		</ButtonLink>
	);
};
