/* ----- PDF.js ----- */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Assests
import GramaCheckLogoV1 from "../../../../assets/images/logo/GramaSevakaLogo-01.png";
import GramaCheckLogoV2 from "../../../../assets/images/logo/GramaSevakaLogo-02.png";
import GramaSevakaSignature from "../../../../assets/images/signature/signature.png";

// Libraries & Packages
import Color from "color";
import rgbHex from "rgb-hex";

// Utils
import { Colors } from "../../../../utils/styles/Theme";

function PDF({ citizen }) {
  console.log(citizen);
  // Create styles
  const styles = StyleSheet.create({
    // Logo
    viewLogo: {
      width: "90%",
      height: "60px",
      //   backgroundColor: "lightgreen",
      margin: "0px auto",
      marginTop: "20px",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      height: "40px",
      width: "200px",
    },
    // Heading
    heading: {
      width: "90%",
      height: "30px",

      backgroundColor: `#${rgbHex(
        Color(Colors.primary_regular).color[0],
        Color(Colors.primary_regular).color[1],
        Color(Colors.primary_regular).color[2],
        0.3
      )}`,
      borderRadius: "5px",
      margin: "0px auto",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    headingText: {
      fontSize: "14px",
      fontWeight: "bold",
      color: Colors.primary_regular,
    },
    // Sub Heading
    subheading: {
      width: "90%",
      height: "30px",

      margin: "0px auto",
      marginTop: "10px",

      display: "flex",
      justifyContent: "center",
      alignItems: "start",
    },
    subheadingText: {
      fontSize: "14px",
      fontWeight: "bold",
      textDecoration: "underline",
      color: Colors.grey_regular,
    },
    // Item
    item: {
      width: "90%",
      height: "20px",
      //   backgroundColor: "coral",
      borderRadius: "5px",
      margin: "0px auto",

      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",

      marginTop: "10px",
    },
    itemKey: {
      width: "30%",

      fontSize: "14px",
      fontWeight: "bold",
      color: Colors.primary_regular,
      //   backgroundColor: "lightgreen",

      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
    itemValue: {
      width: "70%",
      height: "30px",
      fontSize: "14px",
      color: Colors.grey_regular,
    },
    // Authorization
    signature: {
      width: "90%",
      height: "30px",
      //   backgroundColor: "lightgreen",
      margin: "0px auto",
      marginTop: "50px",
    },
    signatureImage: {
      width: "150px",
    },
    signatureText: {
      width: "90%",
      height: "30px",

      margin: "0px auto",
      marginTop: "10px",
      height: "30px",
      fontSize: "14px",
      color: Colors.grey_regular,
      fontWeight: "bold",
    },
  });
  return (
    <Document>
      <Page size="A4">
        {/* Logo */}
        <View style={styles.viewLogo}>
          <Image src={GramaCheckLogoV2} style={styles.logo} />
        </View>
        {/* ---------- Citizen Details ---------- */}
        <View style={styles.heading}>
          <Text style={styles.headingText}>Citizen Details</Text>
        </View>
        {/* ----- General Details ----- */}
        <View style={styles.subheading}>
          <Text style={styles.subheadingText}>General Details</Text>
        </View>
        {/* NIC */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>NIC</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.nic_number}`}</Text>
        </View>
        {/* Email */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>Email</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.email}`}</Text>
        </View>
        {/* ----- Address ----- */}
        <View style={styles.subheading}>
          <Text style={styles.subheadingText}>Address</Text>
        </View>
        {/* House No */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>House No </Text>
          <Text style={styles.itemValue}>{`: ${citizen?.house_no}`}</Text>
        </View>
        {/* Street */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>Street</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.street}`}</Text>
        </View>
        {/* City */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>City</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.city}`}</Text>
        </View>
        {/* District */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>District</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.district}`}</Text>
        </View>
        {/* Province */}
        <View style={styles.item}>
          <Text style={styles.itemKey}>Province</Text>
          <Text style={styles.itemValue}>{`: ${citizen?.province}`}</Text>
        </View>
        {/* Authorization */}
        {/* Logo */}
        <View style={styles.signature}>
          <Image src={GramaSevakaSignature} style={styles.signatureImage} />
        </View>
        <Text style={styles.signatureText}>Grama Sevaka</Text>
      </Page>
    </Document>
  );
}

export default PDF;
