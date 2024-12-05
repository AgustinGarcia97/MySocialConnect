import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CreateAccount } from './CreateAccount';
import { Provider } from 'react-redux';
import {store} from '../../redux/store';
import {CreatePassword} from "./registration_steps/CreatePassword";
import AsyncStorage from '@react-native-async-storage/async-storage';
describe('CreateAccount', () => {

    it('debe mostrar error si se ingresan menos caracteres para el nombre', () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <CreateAccount />
            </Provider>
        );
        const nameInput = getByLabelText('Nombre');
        fireEvent.changeText(nameInput, 'ab');
        const errorMessage = getByText('El nombre debe tener entre 3 y 16 letras, sin números ni caracteres especiales.');
        expect(errorMessage).toBeTruthy();
    });

    it('debe mostrar error si el nombre tiene numeros', () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <CreateAccount />
            </Provider>
        );
        const nameInput = getByLabelText('Nombre');
        fireEvent.changeText(nameInput, 'John123');
        const errorMessage = getByText('El nombre debe tener entre 3 y 16 letras, sin números ni caracteres especiales.');
        expect(errorMessage).toBeTruthy();
    });

    it('Debe mostrar error si el email es invalido', () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <CreateAccount />
            </Provider>
        );
        const emailInput = getByLabelText('Mail');
        fireEvent.changeText(emailInput, 'invalidemail');
        const errorMessage = getByText('Correo inválido. Ingresa un correo válido.');
        expect(errorMessage).toBeTruthy();
    });

    it('debe dar error por contraseña corta', () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <CreatePassword />
            </Provider>
        );
        const passwordInput = getByLabelText('Contraseña');
        fireEvent.changeText(passwordInput, '123');
        const errorMessage = getByText('La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número.');
        expect(errorMessage).toBeTruthy();
    });

    it('deberia mostrar error si las passwords no coinciden', () => {
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <CreatePassword />
            </Provider>
        );
        const passwordInput = getByLabelText('Contraseña');
        const confirmPasswordInput = getByLabelText('Ingresa nuevamente la contraseña');
        fireEvent.changeText(passwordInput, 'Test1234');
        fireEvent.changeText(confirmPasswordInput, 'Test4321');
        const errorMessage = getByText('Las contraseñas no coinciden.');
        expect(errorMessage).toBeTruthy();
    });

    it('Debe mostrar errores en caso de campos invalidos', () => {
        const { getByLabelText, getByText, getByRole } = render(
            <Provider store={store}>
                <CreateAccount />
            </Provider>
        );
        const submitButton = getByRole('button');
        fireEvent.changeText(getByLabelText('Nombre'), 'Jo');
        fireEvent.changeText(getByLabelText('Mail'), 'invalidemail');
        fireEvent.press(submitButton);

        const nameError = getByText('El nombre debe tener entre 3 y 16 letras, sin números ni caracteres especiales.');
        const emailError = getByText('Correo inválido. Ingresa un correo válido.');

        expect(nameError).toBeTruthy();
        expect(emailError).toBeTruthy();
    });
});
