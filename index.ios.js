
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var styles = StyleSheet.create({
                               settingsBox: {
                               marginTop:100,
                               padding:10,
                               width:width-40,
                               backgroundColor:'transparent',
                               alignSelf:'center',
                               },
                               settingsText: {
                               fontSize: 16,
                               alignSelf:'center',
                               color:'white'
                               },
                               row: {
                               flexDirection: 'column',
                               padding: 10,
                               backgroundColor: 'transparent',
                               marginBottom:10,
                               },
                               thumb: {
                               width: 64,
                               height: 64,
                               },
                               text: {
                               flex: 1,
                               },
                               answerHeaderText: {
                               fontSize: 16,
                               padding: 4,
                               },
                               multiline: {
                               height: 60,
                               fontSize: 16,
                               padding: 4,
                               marginBottom: 10,
                               },
                               imageContainer: {
                               flex: 1,
                               alignItems: 'stretch'
                               },
                               backgroundImage: {
                               width: width,
                               height: height
                               },
                               textBox : {
                               marginTop: 10,
                               marginLeft: 10,
                               marginRight: 10,
                               backgroundColor: 'white',
                               padding: 10,
                               width:width-40,
                               alignSelf: 'center',
                               },
                               answerHeader: {
                               marginTop:60,
                               padding:10,
                               width:width-40,
                               backgroundColor:'white',
                               alignSelf:'center',
                               },
                               answerEditBox : {
                               marginLeft:10,
                               marginRight:10,
                               backgroundColor:'white',
                               padding:10,
                               width:width-40,
                               alignSelf:'center',
                               },
                               rowTextTop: {
                               marginBottom:10,
                               color:'white',
                               fontSize:10
                               },
                               rowTextMain: {
                               color:'white',
                               fontSize:15
                               },
                               mainText: {
                               color: 'black',
                               fontSize: 20
                               },
                               mainContainer: {
                               flex: 4,
                               flexDirection: 'column',
                               marginTop:100
                               },
                               leftNavButtonText: {
                               fontSize: 16,
                               marginLeft:18,
                               marginTop:10,
                               color:'white'
                               },
                               rightNavButtonText: {
                               fontSize: 16,
                               marginRight:18,
                               marginTop:10,
                               color:'white'
                               },
                               nav: {
                               height: 60,
                               backgroundColor: 'transparent'
                               },
                               title: {
                               marginTop:4,
                               fontSize:16
                               },
                               button: {
                               height:60,
                               marginBottom:10,
                               backgroundColor: '#efefef',
                               justifyContent: 'center',
                               alignItems: 'center'
                               },
                               buttonText: {
                               fontSize:18
                               }
                               });

var NoTransition = {
opacity: {
value: 1.0,
type: 'constant',
}
};

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

import React, { Component } from 'react';
import { Text, Navigator, AppRegistry, TouchableHighlight, Image, StyleSheet, View, Dimensions, TextInput, Alert, ListView } from 'react-native';
var SQLite = require('react-native-sqlite-storage');
class MyButton extends React.Component {
    render() {
        return (
                <View>
                <Text>{this.props.label}</Text>
                </View>
                )
    }
}

var MOCKED_QUESTIONS_DATA = [
                             {question : '당신에게 가장 기억에 남는 사람은 누구인가요?'},
                             {question : '당신이 가장 좋아하는 동물은 무엇인가요?'},
                             {question : '당신에게 가장 좋았던 기억은 무엇인가요?'},
                             {question : '당신이 가장 좋아하는 음식은 무엇인가요?'},
                             {question : '당신에게 가장 기억에 남는 여행지는 어디인가요?'},
                             ];

var MOCKED_DATE_DATA = [
                        {date: '2016/ 10/ 12'},
                        {date: '2016/ 11/ 01'},
                        {date: '2016/ 11/ 10'},
                        {date: '2016/ 11/ 18'},
                        {date: '2016/ 11/ 20'},
                        ]

var NavigationBarRouteMapper = {
    Title(route, navigator, index, navState) {
        // return <Text style={ styles.title }>MY APP TITLE</Text>
    },
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight style={{backgroundColor:'transparent'}}
                    underlayColor="transparent"
                    onPress={() => { if (index > 0) { navigator.pop() } }}>
                    <Image
                    style={{overflow:'visible', width:30, height:30, marginLeft:18, marginTop:5}}
                    source={require('./img/back_btn.png')}/>
                    </TouchableHighlight>
                    <Image
                    style={{overflow: 'visible',  width: 30, height: 30, marginLeft:16, marginTop:5}}
                    source={require('./img/small_fox.png')}/>
                    </View>
                    )}
        else { return null }
    },
    RightButton(route, navigator, index, navState) {
        if(route.component == AnswerEdit) {
            return (
                    <TouchableHighlight style={{backgroundColor:'transparent'}}
                    underlayColor="transparent"
                    onPress={() => {
                    navigator.resetTo({
                                      component: Question,
                                      passProps: {
                                      id: 'Question',
                                      main: '내용',
                                      },
                                      onPress: this.onPress,
                                      rightText: 'ALERT!',
                                      })}}>
                    
                    <Image
                    style={{overflow:'visible', width:30, height:30, marginRight:18, marginTop:5}}
                    source={require('./img/check_btn.png')}/>
                    </TouchableHighlight>
                    )}
        else if(index == 0) {
            return (
                    <TouchableHighlight style={{backgroundColor:'transparent'}}
                    underlayColor="transparent"
                    onPress={() => Alert.alert(
                                               '메뉴',
                                               null,
                                               [
                                                {text: '지난 이야기', onPress: () => {navigator.push({
                                                                                                component: AnswerList,
                                                                                                passProps: {
                                                                                                id: 'AnswerList',
                                                                                                },
                                                                                                onPress: this.onPress,
                                                                                                rightText: 'ALERT!'
                                                                                                })}},
                                                {text: '설정', onPress: () => navigator.push({
                                                                                           component: Settings,
                                                                                           passProps: {
                                                                                           id: 'AnswerList',
                                                                                           },
                                                                                           onPress: this.onPress,
                                                                                           rightText: 'ALERT!'
                                                                                           })},
                                                {text: '취소', onPress: () => console.log('Cancel Pressed!')}
                                                ]
                                               )}>
                    <Image
                    style={{overflow:'visible', width:30, height:30, marginRight:18, marginTop:5}}
                    source={require('./img/menu_btn.png')}/>
                    </TouchableHighlight>
                    )
        }
    }
};


//답변 작성 클래스
class AnswerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        text: '',
        };
        this.writeProcess = this.writeProcess.bind(this);
        this.getText = this.getText.bind(this);
    }
    
    writeProcess() {
        console.log("writeProcess 진입");
    }
    
    getText() {
        return 'haha';
    }
    
    render() {
        return (
                <View style ={styles.imageContainer}>
                <Image
                style={styles.backgroundImage}
                source={require('./img/main_bg_img.png')}>
                
                <View style={styles.answerHeader}>
                <Text style={styles.answerHeaderText}>{this.props.question}</Text>
                </View>
                <View style={styles.answerEditBox}>
                <TextInput
                autoFocus={true}
                placeholder="* 이 곳에 당신의 이야기를 적어보세요.`"
                style={styles.multiline}
                multiline = {true}
                
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
                </View>
                </Image>
                </View>
                );
    }
}

//미리 작성한 답변 보기 클래스
class AnswerText extends Component {
    constructor(props) {
        super(props);
        this.state = {
     			text: '없어',
        };
        this._onPress = this._onPress.bind(this);
    }
    writeProcess() {
        console.log("writeProcess 진입");
    }
    
    render() {
        return (
                <View style ={styles.imageContainer}>
                <Image
                style={styles.backgroundImage}
                source={require('./img/main_bg_img.png')}>
                <TouchableHighlight onPress={this._onPress}>
                <View>
                <View style={styles.answerHeader}>
                <Text style={styles.answerHeaderText}>{this.props.question}</Text>
                </View>
                <View style={styles.answerEditBox}>
                <Text
                style={styles.multiline}
                >{this.state.text}</Text>
                </View>
                </View>
                </TouchableHighlight>
                </Image>
                </View>
                );
    }
    
    _onPress(rowID: number) {
        this.props.navigator.push({
                                  component: AnswerEdit,
                                  passProps: {
                                  id: 'AnswerList',
                                  question: this.props.question,
                                  main: '내용',
                                  },
                                  onPress: this.onPress,
                                  rightText: 'ALERT!'
                                  });
    }
}

//설정 클래스
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        text: '',
        };
        this._onPress = this._onPress.bind(this);
    }
    writeProcess() {
        console.log("writeProcess 진입");
    }
    
    render() {
        return (
                <View style ={styles.imageContainer}>
                <Image
                style={styles.backgroundImage}
                source={require('./img/main_bg_img.png')}>
                <View style={styles.settingsBox}>
                <Text style={styles.settingsText}>만든이 : MOMU</Text>
                </View>
                </Image>
                </View>
                );
    }
    
    _onPress(rowID: number) {
        this.props.navigator.push({
                                  component: AnswerEdit,
                                  passProps: {
                                  id: 'AnswerList',
                                  title: '제목',
                                  main: '내용',
                                  },
                                  onPress: this.onPress,
                                  rightText: 'ALERT!'
                                  });
    }
}



//질문 클래스
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
     			question: MOCKED_QUESTIONS_DATA[0].question,
            position : 0
        };
        this.gotoNext = this.gotoNext.bind(this)
        this._onPressButton = this._onPressButton.bind(this)
    }
    
    render() {
        var movie = MOCKED_QUESTIONS_DATA[this.position];
        return (
                <View style ={styles.imageContainer}>
                <Image
                style={styles.backgroundImage}
                source={require('./img/main_bg_img.png')}>
                
                <View
                style={{marginLeft: 35, marginTop: 120}}>
                <Image
                style={{overflow: 'visible',  width: 40, height: 40}}
                source={require('./img/small_fox.png')}/>
                </View >
                
                <TouchableHighlight onPress={this.gotoNext} style={styles.textBox}>
                <Text style={{backgroundColor: 'white'}}>{this.state.question}</Text>
                </TouchableHighlight>
                
                
                <TouchableHighlight onPress={this._onPressButton} style={{alignSelf:'center', marginTop:150}}>
                <Text style={{color:'white',textDecorationLine: 'underline', }}>다른 질문 보여줘!</Text>
                </TouchableHighlight>
                
                </Image>
                </View>
                );
    }
    
    //질문 박스 클릭 이벤트
    _onPressQuestion() {
        this.setState({
                      question: this.state.question,
                      position : this.state.position,
                      });
        console.log("박스 클릭함");
    }
    
    gotoNext() {
        this.props.navigator.push({
                                  component: AnswerEdit,
                                  passProps: {
                                  id: 'AnswerEdit',
                                  question: this.state.question,
                                  },
                                  onPress: this.onPress,
                                  rightText: 'ALERT!'
                                  })}
    
    
    //다른 질문 보여줘 버튼 클릭 이벤트
    _onPressButton() {
        pos = this.state.position;
        if(pos == MOCKED_QUESTIONS_DATA.length-1) {
            pos = 0;
        } else {
            pos++;
        }
        
        this.setState({
                      question: MOCKED_QUESTIONS_DATA[pos].question,
                      position : pos
                      });
    }
}

//답변 리스트 클래스
class AnswerList extends Component {
    constructor(props) {
        super(props);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
     			dataSource: ds.cloneWithRows(['글1', '글2','글3','글4','글5']),
        };
        
        this._renderRow = this._renderRow.bind(this);
    }
    
    render() {
        var movie = MOCKED_QUESTIONS_DATA[this.position];
        return (
                <View style ={styles.imageContainer}>
                <Image
                style={styles.backgroundImage}
                source={require('./img/main_bg_img.png')}>
                <View style={{flex: 1, paddingTop: 80, paddingLeft:18}}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow = {this._renderRow}
                />
                </View>
                </Image>
                </View>
                );
    }
    
    _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        var rowHash = Math.abs(hashCode(rowData));
        // var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        var imgSource = require('./img/small_fox.png')
        return (
                <TouchableHighlight onPress={() => {
                this._pressRow(rowID);
                highlightRow(sectionID, rowID);
                }}>
                <View>
                <View style={styles.row}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.rowTextTop}>{MOCKED_DATE_DATA[rowID].date}</Text>
                <Image
                style={{overflow: 'visible',  width: 10, height: 10, marginLeft:5, marginTop:2}}
                source={require('./img/small_fox.png')}/>
                </View>
                <Text style= {styles.rowTextMain}>
                {MOCKED_QUESTIONS_DATA[rowID].question}
                </Text>
                </View>
                </View>
                </TouchableHighlight>
                );
    }
    _pressRow(rowID: number){
        this.props.navigator.push({
                                  component: AnswerText,
                                  passProps: {
                                  id: 'AnswerList',
                                  question: MOCKED_QUESTIONS_DATA[rowID].question,
                                  answer:''
                                  },
                                  onPress: this.onPress,
                                  rightText: 'ALERT!'
                                  });
    }
}





//기본 클래스
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
    				question: MOCKED_QUESTIONS_DATA[0].question,
            position : 0,
            isWriting : false
        };
        
        
        this.populateDatabase = this.populateDatabase.bind(this);
    }
    
    render() {
//        this.populateDatabase();
        return (
                <Navigator
                style={{flex:1}}
                initialRoute={{name: 'Question', component: Question}}
                renderScene={ this.renderScene }
                navigationBar={
                <Navigator.NavigationBar
                style={ styles.nav }
                routeMapper={NavigationBarRouteMapper} />}
                />
                )
    }
    renderScene(route, navigator) {
        return <route.component {...route.passProps} navigator={navigator} />
    }
    
    
    populateDatabase(db) {
        var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, this.openCB, this.errorCB);
        db.transaction((tx) => {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS Questions( '
                                     + 'question_id INTEGER PRIMARY KEY NOT NULL, '
                                     + 'question_str VARCHAR(50) UNIQUE); ', [], this.successCB, this.errorCB);
                       
                       for(let i=0; i<MOCKED_QUESTIONS_DATA.length; i++) {
                       tx.executeSql('INSERT INTO Questions (question_str) VALUES (?);', [MOCKED_QUESTIONS_DATA[i].question]);
                       }
                       tx.executeSql('SELECT * FROM Questions', [], (tx, results) => {
                                     console.log("Query completed");
                                     
                                     // Get rows with Web SQL Database spec compliance.
                                     
                                     var len = results.rows.length;
                                     for (let i = 0; i < len; i++) {
                                     let row = results.rows.item(i);
                                     console.log(`Question id: ${row.question_id}, Question Str: ${row.question_str}`);
                                     }
                                     
                                     // Alternatively, you can use the non-standard raw method.
                                     
                                     /*
                                      let rows = results.rows.raw(); // shallow copy of rows Array
                                      
                                      rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
                                      */
                                     });
                       });
    }
}


AppRegistry.registerComponent('tale', () => App);
