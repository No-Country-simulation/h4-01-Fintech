"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import {
    getAllNotifications,
    markNotificationAsRead,
    deleteNotification
} from "@/services/notifications";
import Loading from "@/app/loanding";
import { Button, ScrollArea } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";

interface Notification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const Mailbox = ({ userId }: { userId: string }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const data = await getAllNotifications(userId);
                const formattedData = data.map((notif: any) => ({
                    id: notif.id,
                    title: notif.message,
                    message: notif.message,
                    isRead: notif.read_status,
                    createdAt: notif.timestamp.toISOString(),
                }));
                setNotifications(formattedData);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    const handleOpenNotification = (notification: Notification) => {
        setSelectedNotification(notification);
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === notification.id ? { ...notif, isRead: true } : notif
                )
            );
        }
    };

    const handleDeleteNotification = async (notificationId: string) => {
        try {
            await deleteNotification(userId, notificationId);
            setNotifications((prev) =>
                prev.filter((notif) => notif.id !== notificationId)
            );
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    if (loading) return <Loading />;
    if (notifications.length === 0) return <p className="text-center text-gray-500">No tienes notificaciones.</p>;

    return (
        <div className="w-full max-w-lg mx-auto p-4 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Bandeja de Mensajes</h2>

            <ScrollArea className="h-64 rounded-lg border border-gray-300 shadow-sm bg-white">
                <div className="space-y-2 p-2">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${notif.isRead ? "bg-gray-200" : "bg-gray-50"}
                                hover:bg-gray-100`}
                            onClick={() => handleOpenNotification(notif)}
                        >
                            <div className="flex items-center space-x-3">
                                {notif.isRead ? (
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                ) : (
                                    <Circle className="text-gray-400 w-5 h-5" />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                                    <p className="text-xs text-gray-600 truncate w-40">{notif.message}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-xs text-gray-500">
                                    {new Date(notif.createdAt).toLocaleDateString()}
                                </span>
                                <button 

                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNotification(notif.id);
                                    }}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Modal para ver el mensaje completo */}
            <Dialog.Root open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {selectedNotification?.title}
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-700">
                            
                        </Dialog.Description>
                        <div className="mt-4 text-right">
                            <Button variant="classic" onClick={() => setSelectedNotification(null)}>Cerrar</Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};
