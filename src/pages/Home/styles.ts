import { styled, Row } from '@nextui-org/react';

import { colors } from '../../styles/colors';

const Container = styled(Row, {
  backgroundColor: `${colors.bgPrimaryLight}`,
  minHeight: '90vh',
});

export { Container };
