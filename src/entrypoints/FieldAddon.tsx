import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import s from './styles.module.css';
import { SlugButtonProps } from '../types';
import { PreviewButton } from '../components/PreviewButton';

export const FieldAddon = ({ ctx }: { ctx: RenderFieldExtensionCtx }): JSX.Element => {
	return (
		<Canvas ctx={ctx}>
			<div className={s.buttonRow}>
				{(ctx.parameters.buttonList as SlugButtonProps[]).map(button => (
					<PreviewButton key={button.id} button={button} ctx={ctx} />
				))}
			</div>
		</Canvas>
	);
};
