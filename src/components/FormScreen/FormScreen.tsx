import React, { useState } from "react";
import { PageCenter } from "../../styles/Global";
import styled from "styled-components";
import { useQuiz } from "../../context/QuizContext";
import { ScreenTypes } from "../../types";
import Button from "../ui/Button";
import { useLanguage } from '../../hooks/useLanguage'


const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 2.5rem 3.125rem;
`;

const Content = styled.p`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  overflow: hidden;
`;

const AppTitle = styled.h2`
  font-weight: 400;
  font-size: 32px;
  color: #fff;
  background-color: #20243d;
  padding: 1rem 3.125rem;
`;

const FormControl = styled.input`
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    transition: border .3s ease;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    transition: border .3s ease;
`;

const Field = styled.div`

`;

const Label = styled.label`
    display: block;
    color: #64e3ce;
    background-color: #242424;
    border-radius: 4px;
    font-size: 1.3rem;
    padding: 10px;
    margin-top: 15px;
`;

const FormScreen = () => {
    const { setCurrentScreen, setUser, user } = useQuiz();
    const [ showOtherComeFrom, setShowOtherComeFrom ] = useState(false);
    const { t } = useLanguage();

    const goToQuestionScreen = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentScreen(ScreenTypes.QuizDetailsScreen)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value.length < 4) {
            return;
        }
        setUser(prev => ({ ...prev, phoneNumber: value }));
    };

    const onChangeSelect = (value: string) => {
        if(value === 'otherComeFrom') {
            setShowOtherComeFrom(true);
        } else {
            setShowOtherComeFrom(false);
        }
        setUser(prev => ({ ...prev, comeFrom: value }));
    }

    return (
        <PageCenter light justifyCenter>
            <Content style={{ width: "100%", maxWidth: "450px" }}>
                <AppTitle style={{ textAlign: "center" }}>{t("formTitle")}</AppTitle>
                <Container>
                    <form onSubmit={goToQuestionScreen}>
                        <Field>
                            <Label>{t("firstName")}</Label>
                            <FormControl 
                                name="firstName"
                                onChange={onChange}
                                value={user.firstName}
                                type="value"
                                required 
                                placeholder={t("firstName")}
                            />
                        </Field>
                        <Field>
                            <Label>{t("lastName")}</Label>
                            <FormControl
                              name="lastName"
                              onChange={onChange}
                              value={user.lastName}
                              type="value"
                              required
                              placeholder={t("lastName")}
                            />
                        </Field>
                        <Field>
                            <Label>{t("surName")}</Label>
                            <FormControl
                              name="surName"
                              onChange={onChange}
                              value={user.surName}
                              type="value"
                              required
                              placeholder={t("surName")}
                            />
                        </Field>
                        <Field>
                            <Label>{t("dateOfBirth")}</Label>
                            <FormControl 
                                name="dateOfBirth"
                                onChange={onChange}
                                value={user.dateOfBirth}
                                type="date"
                                max={50}
                                min={16}
                                required 
                                placeholder={t("dateOfBirth")}
                            />
                        </Field>
                        <Field>
                            <Label>{t("phone")}</Label>
                            <FormControl
                                name="phoneNumber"
                                onChange={onChangePhone}
                                value={user.phoneNumber}
                                required 
                                placeholder={t("phone")}
                            />
                        </Field>
                        <Field style={{ marginBottom: "40px" }}>
                            <Label>{t("comeFrom")}</Label>
                            <Select
                                name="comeFrom"
                                onChange={(e) => onChangeSelect(e.target.value)} 
                                value={user.comeFrom}
                                required
                                placeholder={t("comeFrom")}
                            >
                                <option value="" disabled selected>{t("chooseRegion")}</option>
                                <option value="To'shkent shahri">{t("tashkent")}</option>
                                <option value="To'shkent viloyati">{t("tashkentRegion")}</option>
                                <option value="Namangan">{t("namangan")}</option>
                                <option value="Farg'ona">{t("fergana")}</option>
                                <option value="Andijon">{t("andijan")}</option>
                                <option value="Sirdaryo">{t("syrdaryo")}</option>
                                <option value="Djizzax">{t("jizzakh")}</option>
                                <option value="Samarqand">{t("samarqand")}</option>
                                <option value="Navoiy">{t("navoiy")}</option>
                                <option value="Buxoro">{t("bukhara")}</option>
                                <option value="Qashqadaryo">{t("qashqadaryo")}</option>
                                <option value="Surxondaryo">{t("surxondaryo")}</option>
                                <option value="Xorazm">{t("khorezm")}</option>
                                <option value="Qoraqalpog'iston">{t("karakalpakstan")}</option>
                                <option value="otherComeFrom">{t("other")}</option>
                            </Select>
                            {showOtherComeFrom && 
                                <FormControl 
                                    name="otherComeFrom"
                                    onChange={onChange}
                                    value={user.otherComeFrom}
                                    required 
                                    placeholder={t("comeFrom")}
                                />
                            }
                        </Field>
                        <Button
                            text={t("start")}
                            type="submit"
                            onClick={() => ""}
                            bold
                        />
                    </form>
                </Container>
            </Content>
        </PageCenter>
    );
}

export default FormScreen;