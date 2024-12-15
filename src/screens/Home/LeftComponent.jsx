import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { ModalContext } from '../../context/ModalContext';

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    overflow: hidden;
    transition: background 0.3s ease-in-out;
    animation: starsBackground 5s infinite linear;

    @keyframes starsBackground {
        0% {
            background: #000;
        }
        50% {
            background: #111;
        }
        100% {
            background: #000;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 100vh;
        position: relative;
    }
`;

const ContentContainer = styled.div`
    text-align: center;
    max-width: 320px;
    margin: 0 auto;
    opacity: 0;
    animation: fadeInSlide 1s ease-in-out forwards;
    animation-delay: 0.3s;

    @keyframes fadeInSlide {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Logo = styled.img`
    width: 220px;
    margin-bottom: 1.5rem;
    transition: transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out;
    filter: brightness(0) saturate(100%) invert(89%) sepia(11%) saturate(1265%) hue-rotate(177deg) brightness(93%) contrast(95%);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(255, 165, 0, 0.5);

    &:hover {
        transform: scale(1.1) rotate(15deg);
        box-shadow: 0 0 30px rgba(255, 165, 0, 1);
    }

    @media (max-width: 768px) {
        width: 180px;
    }

    @media (max-width: 425px) {
        width: 160px;
    }
`;

const MainHeading = styled.h1`
    font-size: 4rem;
    font-family: 'Play', sans-serif;
    font-weight: 700;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    line-height: 1.2;
    text-shadow: 0 0 10px rgba(255, 0, 51, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
    opacity: 0;
    animation: fadeInGlow 1.5s ease-out forwards;
    animation-delay: 0.5s;

    span {
        color: #f39c12;
    }

    @keyframes fadeInGlow {
        0% {
            opacity: 0;
            transform: translateX(-30px);
            text-shadow: 0 0 0px rgba(255, 0, 47, 0.8);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
            text-shadow: 0 0 10px rgba(255, 0, 47, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
        }
    }

    @media (max-width: 768px) {
        font-size: 3.5rem;
    }

    @media (max-width: 425px) {
        font-size: 3rem;
    }
`;

const SubHeading = styled.div`
    font-size: 1.8rem;
    color: #ccc;
    opacity: 0.85;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    animation: fadeInSlide 1.5s ease-out forwards;
    animation-delay: 1s;
    opacity: 0;

    @keyframes fadeInSlide {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 425px) {
        font-size: 1.3rem;
    }
`;

const AddNewButton = styled.button`
    padding: 0.8rem 2.5rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 40px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
    background-color: #f39c12;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.4s ease-in-out;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    outline: none;

    span {
        font-size: 1.6rem;
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.5);
        background-color: #e67e22;
    }

    &:hover span {
        transform: rotate(360deg);
    }

    @media (max-width: 768px) {
        padding: 0.6rem 2rem;
        font-size: 1rem;
    }

    @media (max-width: 425px) {
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
    }
`;

const Footer = styled.footer`
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #ccc;
    font-size: 1rem;
    opacity: 0.7;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    a {
        color: #f39c12;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;

        &:hover {
            color: #fff;
            text-decoration: underline;
        }
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt="Logo" />
                <MainHeading> <span>Retro</span> IDE</MainHeading>
                <SubHeading>Compile Your Thoughts</SubHeading>
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })}>
                    <span>+</span> Create New Playground
                </AddNewButton>
            </ContentContainer>
            <Footer>
                <span>Coded and Designed by </span>
                <a href="https://github.com/DeevKapoor" target="_blank" rel="noopener noreferrer">
                    Deevanshu Kapoor
                </a>
            </Footer>
        </StyledLeftComponent>
    );
}

export default LeftComponent;
