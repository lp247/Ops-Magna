import styled from 'styled-components';

const ModalWindow = styled.div`
	@media (min-width: 501px) {
    width: 400px;
  }
  @media (max-width: 500px) {
    width: 60%;
  }
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding: 48px 12px;
  background-color: #ababab;
  opacity: 1;
  position: fixed;
`;

export default ModalWindow;