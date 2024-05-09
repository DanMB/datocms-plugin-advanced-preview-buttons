import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { SlugButtonProps } from '../types';
import { PreviewButton } from '../components/PreviewButton';

export const FieldAddon = ({ ctx }: { ctx: RenderFieldExtensionCtx }): JSX.Element => {
	return (
		<Canvas ctx={ctx}>
			<div className='buttonRow'>
				{(ctx.parameters.buttonList as SlugButtonProps[]).map(button => (
					<PreviewButton key={button.id} button={button} ctx={ctx} />
				))}
			</div>
		</Canvas>
	);
};
