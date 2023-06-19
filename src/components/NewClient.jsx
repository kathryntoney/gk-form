   <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={clientInfo.firstName}
                    name="firstName"
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={clientInfo.lastName}
                    name="lastName"
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    value={clientInfo.email}
                    name="email"
                />
                <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    onChange={handleChange}
                    value={clientInfo.phone}
                    name="phone"
                />

                <InputLabel id="preferred-pronouns">Preferred pronouns:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clientInfo.pronouns}
                    name="pronouns"
                    label="Preferred Pronouns"
                    onChange={handleChange}
                >
                    <MenuItem disabled value="Pronouns">Pronouns</MenuItem>
                    <MenuItem value="She/her/hers">She/her/hers</MenuItem>
                    <MenuItem value="He/Him/his">He/Him/his</MenuItem>
                    <MenuItem value="They/them/theirs">They/them/theirs</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>