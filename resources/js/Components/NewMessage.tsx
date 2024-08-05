import { FC, useState } from "react";
import { Box, Modal } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { router } from "@inertiajs/react";
import {
    EmailValidationBody,
    ErrorProps,
    NewRoomBody,
    User,
} from "@/interfaces/app";
import CustomTabPanel from "./CustomTabPanel";
import { useForm } from "@/hooks/useForm";
import EmailValidation from "./EmailValidation";
import NewRoom from "./NewRoom";

interface NewMessageProps {
    open: boolean;
    onClose: () => void;
    setSelectedChat: (n: number) => void;
    openError: boolean;
    setOpenError: (value: boolean) => void;
    errors: ErrorProps | undefined;
    users: User[];
}

function a11yProps(index: number): any {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const NewMessage: FC<NewMessageProps> = ({
    users,
    open,
    onClose,
    setSelectedChat,
    errors,
}) => {
    const { form: emailForm, onChange: emailOnChange } =
        useForm<EmailValidationBody>({ email: "" });
    const { form: roomForm, onChange: roomOnChange } = useForm<NewRoomBody>({
        name: "",
    });
    const [tabValue, setTabValue] = useState(0);

    const handleChange: (
        event: React.SyntheticEvent,
        newValue: number
    ) => void = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSubmit: (
        operation: number,
        list?: string[],
        name?: string
    ) => void = (operation, emailList = [], roomName = "") => {
        if (operation === 1) {
            router.post(
                "/verify_user",
                { email: emailForm?.email },
                {
                    preserveState: true,
                    replace: true,
                    onError: (error) => {
                        console.log(error.email);
                    },
                    onSuccess: (res) => {
                        const responseProps = res.props as {
                            room?: { id: number };
                        };
                        if (responseProps.room?.id !== undefined) {
                            setSelectedChat(responseProps.room.id);
                        }
                        onClose();
                    },
                }
            );
        } else {
            router.post(
                "/create_multiuser_room",
                { name: roomName, users: emailList },
                {
                    preserveState: true,
                    replace: true,
                    onError: (error) => {
                        console.log(error);
                    },
                    onSuccess: (res) => {
                        const responseProps = res.props as {
                            room?: { id: number };
                        };
                        if (responseProps.room?.id !== undefined) {
                            setSelectedChat(responseProps.room.id);
                        }
                        onClose();
                    },
                }
            );
        }
    };

    const tabs = [
        {
            label: "Direct Message",
            component: (
                <EmailValidation
                    form={emailForm}
                    onChange={emailOnChange}
                    handleSubmit={handleSubmit}
                    errors={{ email: errors?.email }}
                />
            ),
        },
        {
            label: "Create Room",
            component: (
                <NewRoom
                        form={roomForm}
                        onChange={roomOnChange}
                        handleSubmit={handleSubmit}
                        errors={{ name: errors?.name }}
                        users={users}
                    />
            )
        }
    ];

    return (
        <Modal open={open} onClose={onClose} sx={{ overflow: "hidden" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    width: 500,
                    bgcolor: "background.paper",
                    border: "2px solid #ccc",
                    boxShadow: 24,
                    py: 2,
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabValue} onChange={handleChange}>
                        {
                            tabs.map((tab, index) =><Tab label={tab.label} {...a11yProps(index)} />)
                        }
                    </Tabs>
                </Box>
                {
                    tabs.map((tab, index) => <CustomTabPanel key={tab.label} value={tabValue} index={index}>{tab.component}</CustomTabPanel>)
                }
            </Box>
        </Modal>
    );
};

export default NewMessage;
