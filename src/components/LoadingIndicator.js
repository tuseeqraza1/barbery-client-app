import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import colors from '../styles/colors';

export default function LoadingIndicator() {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				// backgroundColor: colors.white,
				zIndex: 60,
			}}
		>
			<ActivityIndicator size="large" color={colors.red} />
		</View>
	);
}
