import React from "react";
import { Text, CustomAvatar } from "@/components";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button, Card, Dropdown, Space, Tooltip } from "antd";
import { ClientCardSkeleton } from "./skeleton";
import { AvatarGroup } from "./avatar-group";

export const ClientCard = ({ client }) => {
  // const { edit } = useNavigation();
  const router = useRouter();
  if (!client) return <ClientCardSkeleton />;
  const {
    _id,
    avatar = "",
    name,
    relatedContacts,
    primaryRelationship,
    secondaryRelationship,
    clientCode,
    marketCap,
  } = client;
  const relatedContactAvatars = relatedContacts?.map((contact) => {
    return {
      name:
        `${contact.firstName || "N/A"} ${contact.lastName || "N/A"}` || "N/A",
      src: contact.avatar,
    };
  });

  return (
    <Card
      size="small"
      actions={[
        <div
          key="1"
          style={{
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
            }}
          >
            <Text size="xs">Related contacts</Text>
            <AvatarGroup
              size={"small"}
              overlap
              gap="4px"
              avatars={relatedContactAvatars}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            }}
          >
            <Text size="xs">Relationships</Text>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
              }}
            >
              {primaryRelationship && (
                <Tooltip
                  title={
                    `${primaryRelationship.firstName || "N/A"} ${
                      primaryRelationship.lastName || "N/A"
                    }` || "N/A"
                  }
                  key={primaryRelationship?.id}
                >
                  <CustomAvatar src={primaryRelationship?.avatar} />
                </Tooltip>
              )}
              {secondaryRelationship && (
                <Tooltip
                  title={
                    `${secondaryRelationship.firstName || "N/A"} ${
                      secondaryRelationship.lastName || "N/A"
                    }` || "N/A"
                  }
                  key={secondaryRelationship?.id}
                >
                  <CustomAvatar src={secondaryRelationship?.avatar} />
                </Tooltip>
              )}
            </div>
          </div>
        </div>,
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Dropdown
          menu={{
            items: [
              {
                label: "View client",
                key: "1",
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon: <EyeOutlined />,
                onClick: () => {
                  router.push(`/client/client-details/${_id}`);
                },
              },
              {
                danger: true,
                label: "Delete client",
                key: "2",
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon: <DeleteOutlined />,
                onClick: () => {
                  // mutate({
                  //   resource: "client",
                  //   id: client.id,
                  // });
                },
              },
            ],
          }}
          placement="bottom"
          arrow
        >
          <Button
            type="text"
            shape="circle"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            icon={
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            }
          />
        </Dropdown>

        <CustomAvatar
          name={name}
          src={avatar}
          shape="square"
          style={{
            width: "48px",
            height: "48px",
          }}
        />
        <Text
          strong
          size="md"
          ellipsis={{ tooltip: client.name }}
          style={{
            marginTop: "12px",
          }}
        >
          {name}
        </Text>

        <Space
          direction="vertical"
          size={0}
          style={{
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          <Text type="secondary">{clientCode}</Text>
          <Text
            strong
            size="md"
            style={{
              marginTop: "12px",
            }}
          >
            {/* {currencyNumber(client?.dealsAggregate?.[0].sum?.value || 0)} */}
            {marketCap}
          </Text>
        </Space>
      </div>
    </Card>
  );
};
