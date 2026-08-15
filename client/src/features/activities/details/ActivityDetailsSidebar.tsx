import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
} from "@mui/material";

type ActivityDetailsProps = {
  activity: Activity;
};
export default function ActivityDetailsSidebar({ activity }: ActivityDetailsProps) {
  const following = true;
  const isHost = activity?.isHost;

  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">{activity?.attendees?.length} people going</Typography>
      </Paper>
      {activity?.attendees?.length > 0 ? (
        activity?.attendees?.map((attendee) => (
          <Paper sx={{ padding: 2, marginTop: 2 }} key={attendee?.id}>
            <Grid container alignItems="center">
              <Grid size={8}>
                <List sx={{ display: "flex", flexDirection: "column" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={attendee?.displayName}
                        src={attendee?.imageUrl || "/assets/user.png"}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant="h6">{attendee?.displayName}</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
              <Grid
                size={4}
                sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}
              >
                {isHost && (
                  <Chip label="Host" color="warning" variant="filled" sx={{ borderRadius: 2 }} />
                )}
                {following && (
                  <Typography variant="body2" color="orange">
                    Following
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body2">No attendees yet.</Typography>
      )}
    </>
  );
}
