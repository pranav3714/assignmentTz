import React from "react";
import { Page, Text, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from "../logo.svg";

const VoterId = (props) => (//props.ucFirstFn
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>Voter's Identity Card</Text>
                <Text style={styles.smallTitle}>Election Commission</Text>
                <Image
                    style={{
                        width: "50%",
                        height: "40%"
                    }}
                    src={`${props.voterObj.image}`}
                />
                <Text
                    style={{
                        position: "absolute",
                        textAlign: "right",
                        marginTop: "35%"

                    }}
                >{props.ucFirstFn(`${props.voterObj.fname} ${props.voterObj.sname} ${props.voterObj.lname}`)}</Text>
                <Text
                    style={{
                        position: "absolute",
                        textAlign: "right",
                        marginTop: "45%"

                    }}
                >Gender: {(props.voterObj.gender === "m") ? "Male" : "Female"}</Text>
                <Text
                    style={{
                        position: "absolute",
                        textAlign: "right",
                        marginTop: "55%"

                    }}
                >DOB: {new Date(props.voterObj.dob).toLocaleDateString()}</Text>
                <Text
                    style={{
                        marginTop: "10%"
                    }}
                >EID: {props.voterObj["_id"]}</Text>
                <Text style={{ marginTop: "3%" }}>
                    Address: {props.ucFirstFn(`${props.voterObj.houseAddress}`)}
        </Text>
            </Page>
        </Document>
);

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundImage: { logo }
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    smallTitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Oswald'
    }
});

export default VoterId;