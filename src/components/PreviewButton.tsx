import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { ButtonLink } from 'datocms-react-ui';
import { SlugButtonProps } from '../types';

const regexp = /{([a-z-_]+)}/gi;

export const PreviewButton = ({
	ctx,
	button,
}: {
	ctx: RenderFieldExtensionCtx;
	button: SlugButtonProps;
}): JSX.Element => {
	const listenValues = [...button.value.matchAll(regexp)];

	return (
		<ButtonLink buttonType={button.style || 'muted'} href={button.value} target='_blank'>
			{button.label}
		</ButtonLink>
	);
};
