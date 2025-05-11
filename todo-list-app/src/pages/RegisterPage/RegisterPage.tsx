import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logger from '../../services/logging';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { FormattedMessage, useIntl } from 'react-intl';

const RegisterPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();
    const intl = useIntl();

    const handleRegister = async () =>
    {
        setError("");

        try
        {
            const userCredential = await authService.signUp(email, password);
            logger.info(`Usuario registrado: ${userCredential.user}`);
            await userService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: { admin: false }
            });
            setSuccess(
                intl.formatMessage({
                    id: "register.successMessage",
                    defaultMessage: "Registro exitoso. Redirigiendo a las listas..."
                })
            ); setTimeout(() =>
            {
                navigate('/taskLists');
            }, 2000);
        } catch (error: any)
        {
            logger.error(`Error al registrarse: ${error.message}`);
            setError(error.message);
        }
    };

    useEffect(() =>
    {
        logger.info("Entrando a RegisterPage");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    <FormattedMessage id="register.title" />
                </h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            <FormattedMessage id="register.emailLabel" />
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            <FormattedMessage id="register.passwordLabel" />
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline w-full"
                    >
                        <FormattedMessage id="register.submitButton" />
                    </button>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    {success && <p className="text-green-500 text-sm italic">{success}</p>}
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    <FormattedMessage id="register.alreadyAccount" />
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 focus:outline-none focus-shadow-outline">
                        <FormattedMessage id="register.loginLink" />
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;