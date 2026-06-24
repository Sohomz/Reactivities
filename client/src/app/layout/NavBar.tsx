import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

type Props = {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' , position: 'fixed', top:0}}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        
                        {/* 1. BRAND/LOGO: Changed from Menu/MenuItem to a standard Box */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Group fontSize='large' />
                            {/* Fixed the variant prop syntax here */}
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                Reactivities
                            </Typography>
                        </Box>
                        
                        {/* 2. NAV LINKS: Changed from MenuItem to standard MUI Buttons */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                Activities
                            </Button>
                            <Button color="inherit" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                About
                            </Button>
                            <Button color="inherit" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                Contact
                            </Button>
                        </Box>

                        <Button onClick={openForm} size='large' variant="contained" color="warning">
                            Create Activity
                        </Button>
                        
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}