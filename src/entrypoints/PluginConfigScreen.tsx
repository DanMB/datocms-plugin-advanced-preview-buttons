import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextField } from 'datocms-react-ui';
import { useState } from 'react';

export type Parameters = { prefixList?: string; prefixArray?: string[] };

export const PluginConfigScreen = ({ ctx }: { ctx: RenderConfigScreenCtx }) => {
	const [prefixList, setPrefixList] = useState<string>(
		(ctx.plugin.attributes.parameters as Parameters).prefixList || ''
	);

	return (
		<Canvas ctx={ctx}>
			<p>Welcome to your plugin! This is your config screen!</p>
			<TextField
				name='prefixListString'
				id='prefixListString'
				label='Global prefix List'
				value={prefixList}
				hint='Comma separated list of prefixes.'
				onChange={setPrefixList}
			/>
			<Button
				buttonType='primary'
				onClick={() => {
					const prefixArray = prefixList.split(',');
					ctx.updatePluginParameters({ prefixList, prefixArray });
					ctx.notice('Global settings updated successfully!');
				}}
			>
				Save
			</Button>
		</Canvas>
	);
};
