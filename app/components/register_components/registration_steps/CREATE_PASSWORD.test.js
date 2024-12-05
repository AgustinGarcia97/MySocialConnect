import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CreatePassword }  from './CreatePassword'  // Asegúrate de ajustar la ruta
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';  // Ajusta la ruta si es necesario
import { NavigationContainer } from '@react-navigation/native';

describe('CreatePassword Component', () => {
    test('should render the component correctly', () => {
        const { getByText, getByLabelText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <CreatePassword navigation={{ navigate: jest.fn() }} />
                </NavigationContainer>
            </Provider>
        );

        // Verificar si el título y la descripción están presentes
        expect(getByText('Crea tu cuenta')).toBeTruthy();
        expect(getByText('Crea una contraseña que tenga al menos 6 caracteres')).toBeTruthy();

        // Verificar si los campos de entrada están presentes
        expect(getByLabelText('Contraseña')).toBeTruthy();
        expect(getByLabelText('Ingresa nuevamente la contraseña')).toBeTruthy();
    });

    test('should show error if password is not valid', async () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <CreatePassword navigation={{ navigate: jest.fn() }} />
                </NavigationContainer>
            </Provider>
        );

        const passwordInput = getByLabelText('Contraseña');
        const confirmPasswordInput = getByLabelText('Ingresa nuevamente la contraseña');

        // Simulamos ingresar una contraseña inválida
        fireEvent.changeText(passwordInput, 'pass');
        fireEvent.changeText(confirmPasswordInput, 'pass');

        // Esperamos que aparezca el mensaje de error
        await waitFor(() => {
            expect(getByText('La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número.')).toBeTruthy();
        });
    });

    test('should show error if passwords do not match', async () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <CreatePassword navigation={{ navigate: jest.fn() }} />
                </NavigationContainer>
            </Provider>
        );

        const passwordInput = getByLabelText('Contraseña');
        const confirmPasswordInput = getByLabelText('Ingresa nuevamente la contraseña');

        // Simulamos ingresar dos contraseñas que no coinciden
        fireEvent.changeText(passwordInput, 'Password123');
        fireEvent.changeText(confirmPasswordInput, 'DifferentPassword123');

        // Esperamos que aparezca el mensaje de error de contraseñas no coincidentes
        await waitFor(() => {
            expect(getByText('Las contraseñas no coinciden.')).toBeTruthy();
        });
    });

    test('should successfully register when passwords are valid and match', async () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <CreatePassword navigation={{ navigate: jest.fn() }} />
                </NavigationContainer>
            </Provider>
        );

        const passwordInput = getByLabelText('Contraseña');
        const confirmPasswordInput = getByLabelText('Ingresa nuevamente la contraseña');
        const registerButton = getByText('Registrarse');

        // Simulamos ingresar una contraseña válida
        fireEvent.changeText(passwordInput, 'Password123');
        fireEvent.changeText(confirmPasswordInput, 'Password123');

        // Simulamos hacer clic en el botón de registro
        fireEvent.press(registerButton);

        // Verificamos si se mostró el mensaje de éxito o se intentó navegar
        await waitFor(() => {
            expect(getByText('Ya sos parte de Social Connect! Inicia sesión')).toBeTruthy();
        });
    });
});
