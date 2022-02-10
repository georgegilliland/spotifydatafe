import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing'
import AuthenticateSpotify from '../AuthenticateSpotify';

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
        };
    }
}));

test('renders component', async () => {
    render(
        <MockedProvider>
            <AuthenticateSpotify />
        </MockedProvider>
    )
    const button = screen.getByText(/Authenticate/i);
    expect(button).toBeInTheDocument();
});
