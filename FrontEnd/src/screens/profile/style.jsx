import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,

    color: "#fff",
  },
  Collection_text: {
    color: "#4C0C0C",
    fontSize: 16,
  },
  Collection_num: {
    color: "#77A66B",
    fontSize: 16,
  },
  myPageTitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 30,
  },
  badgeContent: {
    flexDirection: "row",
    marginTop: 20,
  },
  barContent: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  badge: {
    borderRadius: 10,
    width: 85,
    height: 85,
    margin: 9,
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal_header: {
    backgroundColor: "#fff",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ProfileBarContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  Profile_bar: {
    width: 310,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  // 여기
  wow: {
    backgroundColor: "red",
    margin: 50,
    padding: 10,
    width: 100,
  },
  search: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: "#27C4A5",
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 50,
  },
  panelButtonTitle: {
    fontSize: 17,
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
    padding: 16,
    height: 300,
  },
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the background color here
  },
});

export default styles;
