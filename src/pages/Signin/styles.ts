import { styled, Grid } from '@nextui-org/react';

import { colors } from '../../styles/colors';

const Container = styled(Grid, {
  bgColor: `${colors.bgPrimaryLight}`,
  minHeight: '100vh',
  padding: '$18',
});

export { Container };
