import React from 'react'

import {DropDown} from './custom/DropDown'

export default class Formulario extends React.Component{

    state  = {
        formulario: '',
        perguntas: [],
        indexAtual: 1,
        tiposFormulario: [
            { id: null, descricao: 'Selecione...' }, 
            { id: 1, descricao: 'Pergunta Livre' }, 
            { id: 2, descricao: 'Upload' }, 
            { id: 3, descricao: 'Multipla Escolha' },
            { id: 4, descricao: 'Selecione uma opção' },
        ]
    }

    onSelectEscolha = (event, e) => {
        let checked = event.target.checked 
        e.selecionada = checked
    }

    onDescricaoOpcaoChange = (event, obj) => {
        let value = event.target.value
        obj['descricao'] = value
        this.setState({...this.state})
    } 

    onChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        this.setState({...this.state, [name] : value})
    }

    addPergunta = () => {
        this.state.perguntas.push({ descricao:'', index: this.state.indexAtual, tipo:{}, escolhas: [], opcoes: []} )
        this.setState({
            ...this.state,
            perguntas: this.state.perguntas, 
            indexAtual: this.state.indexAtual +1
         })
    }

    

    removePergunta = (pergunta) => {
        let perguntas = this.state.perguntas

        perguntas.pop(pergunta)
        let indexAtual = 1
        perguntas.forEach( p => {
            p.index = indexAtual
            indexAtual = indexAtual + 1
        })
    
        this.setState({...this.state,indexAtual})
    }

    onPerguntaDescChange = (e, pergunta) => {
        pergunta.descricao= e.target.value
        this.setState({...this.state})
    }

    onTipoOpcoesChange = (event, pergunta) => {
        let value = event.target.value
        let tipo = this.filterValue( this.state.tiposFormulario , 'id', value)
        pergunta.tipo = tipo
        this.setState({...this.state})
    }

    filterValue = (array, key, value) => {
        let result = []
        array.forEach( item => {
            if(item[key] == value){
                result.push(item)
            }
        })
        return result[0];
    }

    addEscolha = (pergunta) => {
        pergunta.escolhas.push({})
        this.setState({...this.state})
    }

    addOpcao = (pergunta) => {
        pergunta.opcoes.push({})
        this.setState({...this.state})
    }

    renderChildren = (pergunta) => {

        if(!pergunta.tipo){
            return null
        }

        if(pergunta['tipo']['descricao'] === 'Upload'){
            return (
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <input type="file" className="form-control-file" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        if(pergunta['tipo']['descricao'] === 'Selecione uma opção'){
            if(pergunta.opcoes.length === 0){
                pergunta.opcoes = [{selecionada: false, descricao : ''}]
            }
            return (
                <div>
                    {pergunta.opcoes.map( (e) => (
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" aria-label="radio for following text input" />
                                    </div>
                                </div>
                                <input type="text" className="form-control" aria-label="Text input with checkbox" />
                                <button className="btn btn-primary" onClick={(e) => this.addOpcao(pergunta)} >adicionar</button>
                            </div>
                    ))}
                </div>
                
            )
        }

        if(pergunta['tipo']['descricao'] === 'Multipla Escolha'){
            if(pergunta.escolhas.length === 0){
                pergunta.escolhas = [{selecionada: false, descricao : ''}]
            }
            return (
                <div>
                    {pergunta.escolhas.map( (e) => (
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="checkbox" onChange={(event) => this.onSelectEscolha(event, e)} aria-label="Checkbox for following text input" />
                                    </div>
                                </div>
                                <input type="text" onChange={(event) => this.onDescricaoOpcaoChange(event,e)} className="form-control" aria-label="Text input with checkbox" />
                                <button className="btn btn-primary" onClick={(e) => this.addEscolha(pergunta)} >adicionar</button>
                            </div>
                    ))}
                </div>
                
            )
        }
       
    }

    renderPerguntas = () => {
        let perguntas = this.state.perguntas      
        let tiposFormulario = this.state.tiposFormulario  

        let tiposFormularioOptions = tiposFormulario.map (tf => {
            return {key: tf.id, value: tf.id, label: tf.descricao}
        })

        return perguntas.map( p => (
            <div key={p.index}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>{p.index}</td>
                            <td><input className="form-control" placeholder="Digite a descrição da pergunta" type="text" onChange={(e) => this.onPerguntaDescChange(e, p) } /></td>
                            <td>
                                <DropDown className="form-control" options={tiposFormularioOptions}  onChange={(e) => this.onTipoOpcoesChange(e,p)} />
                            </td>
                            <td><button className="btn btn-danger" onClick={(e) => this.removePergunta(p)} >remover</button></td>
                        </tr>
                    </tbody>
                </table>
                <br />

                {this.renderChildren(p)}
                
            </div>
        ))            
    }

    render(){
        const compPerguntas = this.renderPerguntas();
        return (
            <div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Nome do formulário" name="formulario" onChange={(e) => this.onChange(e)} />
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-success" onClick={this.addPergunta}>Adicionar Pergunta</button>
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-default" 
                                onClick={(e) => this.props.showResult(this.state.formulario, this.state.perguntas)}>
                                Mostrar Objetos
                        </button>
                    </div>
                </div>
                
                <br />
                <br />
                {compPerguntas}
            </div>
        )
            
        }
}   